/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
} from 'react-native'

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import io from 'socket.io-client'
import axios from 'axios'

const App = () => {
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        setSocket(io('http://localhost:3333'))
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('connected', socket => {
                console.log(socket, 'connected')
            })

            socket.on('message', message => {
                const mutableMessages = [...messages]

                mutableMessages.push(message)

                setMessages(mutableMessages)
            })
        }
    }, [socket])

    const handleSend = async () => {
        const response = await axios.post('/messages', { message })

        console.log(response)
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    keyExtractor={item => item.id}
                    data={messages}
                    renderItem={({ item }) => (
                        <Text style={styles.message}>{item.message}</Text>
                    )}
                />
                <View style={styles.backContainer}>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                    />
                    <Button title="Enviar" onPress={handleSend} />
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    backContainer: {
        flexDirection: 'row',
        width: '100%',
        bottom: 0,
        paddingHorizontal: 5,
    },
    container: {
        flex: 1,
    },
    input: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 5,
        color: '#000',
    },
    message: {
        color: '#000',
        fontSize: 18,
    },
})

export default App
