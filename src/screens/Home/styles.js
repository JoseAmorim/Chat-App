import styled from 'styled-components/native'

export const KeyboardAvoindingContainer = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #a997df;
`

export const Container = styled.SafeAreaView`
    flex: 1;
`

export const BackContainer = styled.View`
    flex-direction: row;
    width: 100%;
    bottom: 0;
    padding: 0px 5px;
`

export const MessageInput = styled.TextInput`
    width: 80%;
    background-color: #a997df;
    border-radius: 5px;
    border-color: #ddd;
    border-width: 1px;
    padding: 5px;
    color: #000;
`

export const Message = styled.View`
    margin-left: 15px;
    width: 60%;
    background-color: #4f517d;
    border-radius: 25px;
    padding: 10px;
    margin: 10px;
`

export const YourMessage = styled.View`
    margin-right: 15px;
    width: 60%;
    background-color: #4f517d;
    border-radius: 25px;
    padding: 10px;
    margin: 10px;
    align-self: flex-end;
`

export const MessageAuthor = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 22px;
`

export const MessageText = styled.Text`
    color: #fff;
    font-size: 18px;
`

export const LoadingContainer = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
`

export const Loading = styled.ActivityIndicator.attrs({
    size: 'large',
    color: '#000',
})``

export const MessageTimeStamp = styled.Text`
    color: #ddd;
    font-size: 12px;
    align-self: flex-end;
`
