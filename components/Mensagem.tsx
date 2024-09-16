import { Message } from "@/app";
import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

interface MessageProps {
    mensagem: Message;
    onRead: (messageId: number) => void;

}

export default function MessageComponent({ mensagem, onRead }: MessageProps) {
    useEffect(() => {
        if (!mensagem.read) {
            onRead(mensagem.id)
        }
    }, [mensagem.read])

    return (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{mensagem.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        padding: 10,
        backgroundColor: '#0a7ea4',
        borderRadius: 5,
        marginVertical: 5,
    },
    messageText: {
        color: '#fff'
    }
});
