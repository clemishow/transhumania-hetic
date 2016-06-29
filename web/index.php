<?php

// INIT

session_start();

require_once '../vendor/autoload.php';
require_once __DIR__.'/../models/facebook.class.php';

define ('URL', 'http://localhost:9999/transhumania-hetic/web');

// SILEX

$app = new Silex\Application();

// OPTIONS

$app['debug'] = true;

// SERVICES

$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new Silex\Provider\TwigServiceProvider(), array(
	'twig.path' => __DIR__.'/../views',
));

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array (
        'driver'    => 'pdo_mysql',
        'host'      => 'localhost',
        'dbname'    => 'transhumania',
        'user'      => 'root',
        'password'  => 'root',
        'charset'   => 'utf8'
    ),
));

$app['db']->setFetchMode(PDO::FETCH_OBJ);

// MODELS

$facebook = new Facebook($app);

$fb = new Facebook\Facebook([
        'app_id' => '1002064706514143',
        'app_secret' => '6eb378f0004562f03f6857b5f8fd1c79',
        'default_graph_version' => 'v2.5',
]);

// ROUTES

// HOME
$app->get('/', function() use ($app, $fb, $facebook) {

	$data = array();
    $data['title_page'] = 'Transhumania';
    $data['page_class'] = 'home';

    // GET USER DATA
    $facebookLogin = $facebook->getURL($fb);
    $data['loginUrl'] = $facebookLogin;

	return $app['twig']->render('pages/login.twig', $data);
})
->bind('login');

// FIRST ENTRANCE - QUOTE
$app->get('/begin', function() use ($app, $fb, $facebook) {

	$data = array();
    $data['title_page'] = 'Point de départ';
    $data['page_class'] = 'begin';

    // GET USER DATA
    $facebookUser = $facebook->getUserInfos($fb);
    $data['user'] = $facebookUser;

    $date_birthday = array();
    if (isset($facebookUser['birthday'])) {
        foreach ($facebookUser['birthday'] as $facebookInfo) {
            $date_birthday[] = $facebookInfo;
        } $age = (2016 - substr($date_birthday['0'], 0, 4));
    } else {
        $age = '25';
    }

    if (!isset($data['user']['location']['name'])) {
        $location = 'Non communiqué';
    } else {
       $location = $data['user']['location']['name'];
    }

    // CHECK EXIST
    function checkExist($id, $app) {
        $prepare = $app['db']->prepare('SELECT * FROM users WHERE facebookID = :facebookID');
        $prepare->bindValue('facebookID',$id);
        $execute = $prepare->execute();
        $user    = $prepare->fetch();

        if ($user)
            return 1;
        else
            return 0;
    }

    if ($data['user']['gender'] == 'male') {
        $data['user']['gender'] = 'Masculin';
    } else {
        $data['user']['gender'] = 'Feminin';
    }

    // CREATE ACCOUNT
    $existUser = checkExist($data['user']['id'], $app);
    if (!empty($data['user']) && $existUser == 0) {
        $prepare = $app['db']->prepare('INSERT INTO users (facebookID,firstName,lastName,email,location,gender,age) VALUES (:facebookID,:firstName,:lastName,:email,:location,:gender,:age)');
        $prepare->bindValue('facebookID',$data['user']['id']);
        $prepare->bindValue('firstName',$data['user']['first_name']);
        $prepare->bindValue('lastName',$data['user']['last_name']);
        $prepare->bindValue('email',$data['user']['email']);
        $prepare->bindValue('location',$location);
        $prepare->bindValue('gender',$data['user']['gender']);
        $prepare->bindValue('age',$age);
        $execute = $prepare->execute();
    }

    // GET DATA ABOUT USER IN DB
    $facebookID     = $data['user']['id'];
    $prepare        = $app['db']->prepare("SELECT * FROM users WHERE facebookID = '$facebookID'");
    $execute        = $prepare->execute();
    $userDB         = $prepare->fetchAll();
    $data['userDB'] = $userDB;

	return $app['twig']->render('pages/begin.twig', $data);
})
->bind('begin');

// CORE OF THE WEBDOC - STORY (UI OF IMAGES ON HOVER AND STUFF)
$app->get('/story', function() use ($app, $fb, $facebook) {

	$data = array();
    $data['title_page'] = 'L\'expérience';
    $data['page_class'] = 'story';

    // GET USER DATA FB
    $facebookUser = $facebook->getUserInfos($fb);
    $data['user'] = $facebookUser;

    // GET DATA ABOUT USER IN DB
    $facebookID     = $data['user']['id'];
    $prepare        = $app['db']->prepare("SELECT * FROM users WHERE facebookID = '$facebookID'");
    $execute        = $prepare->execute();
    $userDB         = $prepare->fetch();
    $data['userDB'] = $userDB;

	return $app['twig']->render('pages/story.twig', $data);
})
->bind('story');

// BROWSE
$app->get('/browse', function() use ($app, $fb, $facebook) {

	$data = array();
    $data['title_page'] = 'Browse';
    $data['page_class'] = 'browse';

    // GET USER DATA
    $facebookUser = $facebook->getUserInfos($fb);
    $data['user'] = $facebookUser;

    // GET DATA ABOUT USER IN DB
    $facebookID     = $data['user']['id'];
    $prepare        = $app['db']->prepare("SELECT * FROM users WHERE facebookID = '$facebookID'");
    $execute        = $prepare->execute();
    $userDB         = $prepare->fetchAll();
    $data['userDB'] = $userDB;

	return $app['twig']->render('pages/browse.twig', $data);

})
->bind('browse');

// BROWSE
$app->get('/statistics', function() use ($app, $fb, $facebook) {

    $data = array();
    $data['title_page'] = 'Statisques';
    $data['page_class'] = 'statistics';

    // GET USER DATA
    $facebookUser = $facebook->getUserInfos($fb);
    $data['user'] = $facebookUser;

    // GET DATA ABOUT USER IN DB
    $facebookID     = $data['user']['id'];
    $prepare        = $app['db']->prepare("SELECT * FROM users WHERE facebookID = '$facebookID'");
    $execute        = $prepare->execute();
    $userDB         = $prepare->fetchAll();
    $data['userDB'] = $userDB;

    return $app['twig']->render('pages/statistics.twig', $data);

})
->bind('statistics');

// LOGOUT
$app->get('/logout', function() use($app) {

    $data = array();
    $data['clearCookie'] = setcookie('fbToken', '', time() + 60*24*3600, null, null, false, true);
    $data['destroy'] = session_destroy();
    $data['session_destroy'] = $_SESSION['facebook_access_token'] = '';
    $redirection = header('location:' . URL);

    return $app['twig']->render('pages/logout.twig', $data)->redirect($redirection);
})
->bind('logout');


$app->run();
