<?php

namespace App\Enums;

enum Languages: string
{
    case PYTHON = "python";
    case CPP = "cpp";
    case JAVA = "java";
    case PHP = "php";
    case C = "c";

    public static function getLists(): array
    {
        return [
            self::PYTHON->value => 'Python',
            self::CPP->value => 'C++',
        ];
    }
}
