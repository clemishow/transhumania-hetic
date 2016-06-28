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

    $facebookLogin = $facebook->getURL($fb);
    $data['loginUrl'] = $facebookLogin;

	return $app['twig']->render('pages/begin.twig', $data);
})
->bind('begin');


// BROWSE
$app->get('/browse', function() use ($app, $fb, $facebook) {

	$data = array();
    $data['title_page'] = 'Browse';
    $data['page_class'] = 'browse';

    // GET USER DATA
    $facebookUser = $facebook->getUserInfos($fb);
    $data['user'] = $facebookUser;

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

    // CREATE ACCOUNT
    $existUser = checkExist($data['user']['id'], $app);
    if (!empty($data['user']) && $existUser == 0) {
        $prepare = $app['db']->prepare('INSERT INTO users (facebookID,firstName,lastName,email,location) VALUES (:facebookID,:firstName,:lastName,:email,:location)');
        $prepare->bindValue('facebookID',$data['user']['id']);
        $prepare->bindValue('firstName',$data['user']['first_name']);
        $prepare->bindValue('lastName',$data['user']['last_name']);
        $prepare->bindValue('email',$data['user']['email']);
        $prepare->bindValue('location',$data['user']['location']['name']);
        $execute = $prepare->execute();
    }

    // GET DATA ABOUT USER IN DB
    $facebookID     = $data['user']['id'];
    $prepare        = $app['db']->prepare("SELECT * FROM users WHERE facebookID     = '$facebookID'");
    $execute        = $prepare->execute();
    $userDB         = $prepare->fetchAll();
    $data['userDB'] = $userDB;

	return $app['twig']->render('pages/browse.twig', $data);

})
->bind('browse');

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
