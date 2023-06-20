class ResponseMessages {
    // element - usage element (company: string)
    // status - operation status (true/false: boolean)
    get (element, status) {
        return !status ? `An error while receiving ${element} data`  : `The ${element} data received successfully`
    }

    update (element, status) {
        return !status ? `The ${element} update was failed` : `The ${element} was successfully updated`
    }

    post (element, status) {
        return !status ? `An error when adding ${element} data` : `The ${element} has been successfully added`
    }

    delete (element, status) {
        return !status ? `The ${element} removal was failed` : `The ${element} was successfully deleted`
    }

    search (element, status) {
        return !status ? `The ${element} not found` : `The ${element} is found`
    }

    login (status) {
        let result = ''
        switch (status) {
            case 'success': result = "Server error!"; break;
            case 'failed_match': result = "Your ip is not whitelisted"; break;
            case 'empty_login': result = "Please enter the Login"; break;
            case 'bad_login': result = "Bad Login"; break;
            case 'empty_password': result = "Please enter the password"; break;
            case 'bad_password': result = "Bad password"; break;
            default: result = `Key ${status} is not found`
        }
        return result
    }

    errors (element) {
        let result = ''
        switch (element) {
            case 'server': result = "Server error!"; break;
            case 'ip': result = "Your ip is not whitelisted"; break;
            case 'id': result = "Id is not valid"; break;
            default: result = `Key ${element} is not found`
        }
        return result
    }

}

module.exports = new ResponseMessages()