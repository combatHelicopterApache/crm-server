
const ErrorMessages = {
    "server": {
        "error": "Server error!"
    },
    "ip": {
        "error": "Your ip is not whitelisted"
    },
    "id": {
        "error": "Id is not valid"
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
            "match" : "User with combination Login-password is not found",
            "login" : {
                "empty": "Please enter the Login",
                "error": "Bad Login"
            },
            "password" : {
                "empty": "Please enter the password",
                "error": "Bad password"
            }
        }
    },
    "company": {
        "success": {
            "update": "The company was successfully updated",
            "delete" : "The company was successfully deleted",
            "get": "The lead data received successfully",
            "add": "The lead has been successfully added",
        },
        "failed": {
            "update": "The company update was failed",
            "delete" : "The company removal was failed",
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
    "brand": {
        "success": {
            "update": "The brand was successfully updated",
            "delete" : "The brand was successfully deleted",
            "get": "The brand data received successfully",
            "add": "The brand has been successfully added",
        },
        "failed": {
            "update": "The brand update was failed",
            "delete" : "The brand removal was failed",
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
    "office": {
        "success": {
            "update": "The office was successfully updated",
            "delete" : "The office was successfully deleted",
            "get": "The office data received successfully",
            "add": "The office has been successfully added",
        },
        "failed": {
            "update": "The office update was failed",
            "delete" : "The office removal was failed",
            "get": "An error while receiving data",
            "add": "An error when adding data",
        },
        "common": {
            "search": {
                "success": "Item(s) is found",
                "failed": "Item(s) not found"
            }
        }
    }
}

module.exports = ErrorMessages