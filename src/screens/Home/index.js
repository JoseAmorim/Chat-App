import React, { useEffect, useState, useRef } from 'react'
import {
    FlatList,
    StatusBar,
    Button,
    Platform,
    Alert,
    AsyncStorage,
} from 'react-native'
import Axios from 'axios'
import { socket } from '../../../index'

import {
    Container,
    Message,
    MessageInput,
    BackContainer,
    MessageAuthor,
    MessageText,
    Loading,
    LoadingContainer,
    YourMessage,
    KeyboardAvoindingContainer,
    MessageTimeStamp,
} from './styles'

const Home = ({ route }) => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const { userToChatName, chatId, id } = route.params

    const flatListRef = useRef()

    useEffect(() => {
        socket.connect()

        const getAllMessages = async () => {
            setLoading(true)

            const token = await AsyncStorage.getItem('token')

            const response = await Axios.get(`/messages/${chatId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setMessages(response.data)
            setLoading(false)
        }

        getAllMessages()

        return () => {
            socket.emit('leaveChat', chatId)

            // socket.disconnect()
        }
    }, [chatId])

    useEffect(() => {
        socket.on('sendMessageToClient', msg => {
            const mutableMessages = [...messages, msg]

            setMessages(mutableMessages)
        })
    }, [messages])

    const handleSend = async () => {
        socket.emit('sendMessageToServer', {
            text: message,
            fromId: id,
        })

        setMessage('')
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />

            <KeyboardAvoindingContainer
                behavior="padding"
                enabled={Platform.OS === 'ios'}
            >
                {(loading && (
                    <LoadingContainer>
                        <Loading />
                    </LoadingContainer>
                )) || (
                    <Container>
                        <FlatList
                            ref={flatListRef}
                            keyExtractor={item => `${item._id}`}
                            data={messages}
                            onContentSizeChange={() => {
                                flatListRef.current.scrollToEnd({
                                    animated: true,
                                })
                            }}
                            renderItem={({ item }) => {
                                const messageDate = new Date(item.createdAt)

                                const messageTimeStamp = `${
                                    messageDate.getHours() > 9
                                        ? messageDate.getHours()
                                        : '0' + messageDate.getHours()
                                }:${
                                    messageDate.getMinutes() > 9
                                        ? messageDate.getMinutes()
                                        : '0' + messageDate.getMinutes()
                                }`

                                if (item.from === id) {
                                    return (
                                        <YourMessage>
                                            <MessageText>
                                                {item.text}
                                            </MessageText>
                                            <MessageTimeStamp>
                                                {messageTimeStamp}
                                            </MessageTimeStamp>
                                        </YourMessage>
                                    )
                                }

                                return (
                                    <Message>
                                        <MessageAuthor>
                                            {userToChatName}:
                                        </MessageAuthor>
                                        <MessageText>{item.text}</MessageText>
                                        <MessageTimeStamp>
                                            {`${new Date(
                                                item.createdAt,
                                            ).getHours()}:${new Date(
                                                item.createdAt,
                                            ).getMinutes()}`}
                                        </MessageTimeStamp>
                                    </Message>
                                )
                            }}
                        />
                        <BackContainer>
                            <MessageInput
                                value={message}
                                onChangeText={setMessage}
                            />
                            <Button title="Enviar" onPress={handleSend} />
                        </BackContainer>
                    </Container>
                )}
            </KeyboardAvoindingContainer>
        </>
    )
}

export default Home
