import connect from './connect'

const http = new connect();

const LoginForm = (props) => {

    console.log(props);

    return http.postData(props, `${http.BASE_URL_SELLER}/login`)

        .then(res => {

            return res.data

        }).catch(error => {
            return error
        })
}

export default LoginForm;