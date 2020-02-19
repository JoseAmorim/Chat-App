import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { FlatList, AsyncStorage } from 'react-native'
import { socket } from '../../../index'

import {
    Container,
    User,
    UserName,
    HeaderRightButton,
    HeaderRightButtonText,
} from './styles'

const Chats = ({ navigation, route }) => {
    const [chats, setChats] = useState([])

    useEffect(() => {
        const getAllChats = async () => {
            const token = await AsyncStorage.getItem('token')

            const response = await Axios.get('/chats', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setChats(response.data)
        }

        getAllChats()
    }, [])

    useEffect(() => {
        const handleNewChat = () => {
            const { id } = route.params

            navigation.push('Users', { id })
        }

        navigation.setOptions({
            headerRight: () => (
                <HeaderRightButton onPress={handleNewChat}>
                    <HeaderRightButtonText>Criar Chat</HeaderRightButtonText>
                </HeaderRightButton>
            ),
        })
    }, [navigation, route.params])

    const showUserName = users => {
        const { id } = route.params

        const filteredUser = users.filter(user => user._id !== Number(id))

        return filteredUser[0].name
    }

    const handleChat = chat => {
        const { id } = route.params

        socket.emit('joinChat', chat._id)

        navigation.push('Home', {
            chatId: chat._id,
            id: Number(id),
            userToChatName: showUserName(chat.users),
        })
    }

    return (
        <Container>
            <FlatList
                data={chats}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <User onPress={() => handleChat(item)}>
                        <UserName>{showUserName(item.users)}</UserName>
                    </User>
                )}
            />
        </Container>
    )
}

export default Chats
