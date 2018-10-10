import React from 'react';
import Form from '../components/form';

class FormContainer extends React.Component {

    onSubmit(data){
        fetch('https://webhook.site/83e73f20-be36-4842-a842-b03b699838b4', {
            method: 'POST',
            mode: "no-cors",
            body: JSON.stringify({
                name: data.name,
                phone: data.phone,
                email: data.email
            })
        }).then(() => {alert('Письмо отправлено! Мы ответим в ближайшее время.')}, ()=>{ console.log('error!') });
    };

    render() {
        return <Form onSubmit={data => this.onSubmit(data)} />;
    }
}

export default FormContainer;