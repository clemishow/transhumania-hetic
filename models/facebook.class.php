<?php

	class Facebook {

		public $fb;

		public function __construct($fb) {

			$this->fb = $fb;

			$fb = new Facebook\Facebook([
			        'app_id' => '1002064706514143',
			        'app_secret' => '6eb378f0004562f03f6857b5f8fd1c79',
			        'default_graph_version' => 'v2.5',
			]);

		}

		// CHECK EXIST
	    private function checkExist($id, $app) {
	        $prepare = $app['db']->prepare('SELECT * FROM users WHERE facebookID = :facebookID');
	        $prepare->bindValue('facebookID',$id);
	        $execute = $prepare->execute();
	        $user = $prepare->fetch();

	        if ($user)
	            return 1;
	        else
	            return 0;
	    }

	    // GET URL REDIRECTION
		public function getURL($fb) {

			$helper = $fb->getRedirectLoginHelper();
		    $permissions = ['email', 'public_profile', 'user_birthday', 'user_location'];
		    $loginUrl = $helper->getReRequestUrl(' '. URL .'/begin', $permissions);

		    return $loginUrl;

		}

		// CREATE TOKEN & COOKIE & A ACCOUNT ON DB / GET RESPONSE
		public function getUserInfos($fb) {
			// FACEBOOK
		    $helper = $fb->getRedirectLoginHelper();
		    // CREATE AN TOKEN ACCESS
		    try {
		      $accessToken = $helper->getAccessToken();
		    } catch(Facebook\Exceptions\FacebookResponseException $e) {
		      // When Graph returns an error
		      echo 'Graph erreur : ' . $e->getMessage();
		      exit;
		    } catch(Facebook\Exceptions\FacebookSDKException $e) {
		      // When validation fails or other local issues
		      echo 'Facebook SDK retourne une erreur : ' . $e->getMessage();
		      exit;
		    }

		    // EXTEND TOKEN TO 60 DAYS INSTEAD OF 2 HOURS
		    $oAuth2Client = $fb->getOAuth2Client();
		    if (isset($_COOKIE['fbToken'])) {
		        $longLivedAccessToken = $oAuth2Client->getLongLivedAccessToken($_COOKIE['fbToken']);
		    } else {
		        $longLivedAccessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
		    }

		    // IF TOKEN ACCESS EXIST -> CREATE A SESSION
		    if (isset($longLivedAccessToken)) {
		        $_SESSION['facebook_access_token'] = (string) $longLivedAccessToken;
		        setcookie('fbToken', $longLivedAccessToken, time() + 60*24*3600, null, null, false, true);
		    }

		    if (isset($_COOKIE['fbToken'])) {
		        $fb->setDefaultAccessToken($_COOKIE['fbToken']);
		    } else {
		        $fb->setDefaultAccessToken($longLivedAccessToken);
		    }

		    // RESPONSE
		    try {
		      // PUT WHAT TO GET ON THE USER
		    if (isset($_COOKIE['fbToken'])) {
		        $response = $fb->get('/me?fields=id,name,email,first_name,last_name,picture.width(500),location,gender,birthday', $_COOKIE['fbToken']);
		    } else {
		        $response = $fb->get('/me?fields=id,name,email,first_name,last_name,picture.width(500),location,gender,birthday', $longLivedAccessToken);
		    }
		    } catch(Facebook\Exceptions\FacebookResponseException $e) {
		      echo 'Graph erreur : ' . $e->getMessage();
		      exit;
		    } catch(Facebook\Exceptions\FacebookSDKException $e) {
		      echo 'Facebook SDK retourne une erreur : ' . $e->getMessage();
		      exit;
		    }

		    // GET DATA ABOUT USER W/ FACEBOOK

		    $user = $response->getGraphUser();

		    return $user;
		}
	}
