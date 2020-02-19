import React, { useState, useEffect } from 'react'
import { View, FlatList, AsyncStorage } from 'react-native'
import Axios from 'axios'
import { socket } from '../../../index'

import { Container, User, UserName } from './styles'

const Users = ({ route, navigation }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getAllUsers = async () => {
            const token = await AsyncStorage.getItem('token')

            const response = await Axios.get('/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const { id } = route.params

            const filteredUsers = response.data.filter(
                user => user._id !== Number(id),
            )

            setUsers(filteredUsers)
        }

        getAllUsers()
    }, [route.params])

    const handleUser = async user => {
        const { _id: id } = user

        const token = await AsyncStorage.getItem('token')

        const response = await Axios.post(
            '/chats',
            { userToChatId: id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )

        const { _id } = response.data

        const { id: userId } = route.params

        socket.emit('joinChat', _id)

        navigation.replace('Home', {
            chatId: _id,
            id: userId,
            userToChatName: user.name,
        })
    }

    return (
        <Container>
            <FlatList
                data={users}
                keyExtractor={user => `${user._id}`}
                renderItem={({ item }) => (
                    <User onPress={() => handleUser(item)}>
                        <UserName>{item.name}</UserName>
                    </User>
                )}
            />
        </Container>
    )
}

export default Users
