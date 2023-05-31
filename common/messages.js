const ErrorMessages = {
    "server": {
        "error": "Server error!"
    },
    "ip": {
        "error": "Your ip is not whitelisted"
    },
    "group": {
        "success": {
            "update": "The group was successfully updated",
            "delete" : "The group was successfully deleted",
            "get": "The group data received successfully",
            "add": "The group has been successfully added",
        },
        "failed": {
            "update": "The group update was failed",
            "delete" : "The group  removal  was failed",
            "get": "An error while receiving data",
            "add": "An error when adding data",
        },
        "common": {
            "search": {
                "success": "Item(s) is found",
                "failed": "Item(s) not found"
            }
        }
    },
    "user": {
        "success": {
            "update": "The user was successfully updated",
            "delete" : "The user was successfully deleted",
            "get": "The user data received successfully",
            "add": "The user has been successfully added",
        },
        "failed": {
            "update": "The user update was failed",
            "delete" : "The user  removal  was failed",
            "get": "An error while receiving data",
            "add": "An error when adding data",
            "exists": `User with this email address already exists`
        },
        "common": {
            "search": {
                "success": "Item(s) is found",
                "failed": "Item(s) not found"
            }
        }


    },
    "lead": {
        "success": {
            "update": "The lead was successfully updated",
            "delete" : "The lead was successfully deleted",
            "get": "The lead data received successfully",
            "add": "The lead has been successfully added",
        },
        "failed": {
            "update": "The lead update was failed",
            "delete" : "The lead  removal was failed",
            "get": "An error while receiving data",
            "add": "An error when adding data",
        },
        "common": {
            "search": {
                "success": "Item(s) is found",
                "failed": "Item(s) not found"
            }
        }
    },
    "login": {
        "success": "Authorization success",
        "failed":  {
            "match" : "User with combination login-password is not found",
            "login" : {
                "empty": "Please enter the login",
                "error": "Bad login"
            },
            "password" : {
                "empty": "Please enter the password",
                "error": "Bad password"
            }
        }
    }
}

module.exports = ErrorMessages