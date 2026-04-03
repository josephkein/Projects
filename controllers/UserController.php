<?php

    class UserController{
        private $user;

        public function __construct(User $user)
        {
            $this->user = $user;
        }

        // REGISTRATION OF USER FUNCTION

        public function registerUser($username, $pass){
            $hash = password_hash($pass, PASSWORD_DEFAULT);
            return $this->user->insertUser($username, $hash);
        }

        // AUTHENTICATION

        public function signinUser($username, $pass){
            return $this->user->checkUser($username, $pass);
        }

        public function userInfo($id){
            return $this->user->getUser($id);
        }


    }

?>