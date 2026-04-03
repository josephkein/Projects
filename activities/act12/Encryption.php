<?php 

    class EncryptionController{
        private $key;
        private $iv;

        public function __construct()
        {
            $this->key = "josephkeinhonrada2006";
            $this->iv = "1234567890123456";
        }
        public function encrypt($text){
            $encrypt = openssl_encrypt($text, "AES-256-CBC", $this->key, 0, $this->iv);

            return $encrypt;
        }
        public function decrypt($encrypted){
            $decrypt = openssl_decrypt($encrypted, "AES-256-CBC", $this->key, 0, $this->iv);

            return $decrypt;
        }
    }

?>