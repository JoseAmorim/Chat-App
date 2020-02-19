import React, { useState } from 'react'

import {
    Container,
    Title,
    NameInput,
    KeyboardAvoindingContainer,
} from './styles'
import { Button, Platform, AsyncStorage, Alert } from 'react-native'
import Axios from 'axios'

const Login = ({ navigation }) => {
    const [name, setName] = useState('')

    const handleLogin = async () => {
        if (name.trim() < 5) {
            return
        }

        const response = await Axios.post('/sessions', { id: name })

        if (response) {
            await AsyncStorage.setItem('token', response.data.token)

            navigation.replace('Chats', { id: name })
        } else {
            Alert.alert('Atenção', 'Erro ao conectar')
        }
    }

    return (
        <KeyboardAvoindingContainer
            behavior="padding"
            enabled={Platform.OS === 'ios'}
        >
            <Container>
                <Title>Digite seu id</Title>
                <NameInput value={name} onChangeText={setName} />
                <Button title="Entrar" onPress={handleLogin} />
            </Container>
        </KeyboardAvoindingContainer>
    )
}

export default Login
