<?php

    class ActController{
        private $act;

        public function __construct(Act $act)
        {
            $this->act = $act;
        }
        public function displayActivities(){
            return $this->act->displayProjects();
        }

    }

?>