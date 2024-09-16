import { useEffect, useState } from "react";
import { ListRenderItem, Text, View, FlatList, StyleSheet, TextInput, Button } from "react-native";
import Message from "@/components/Mensagem";

export interface Message {
  id: number,
  text: string,
  read: boolean,
  timeout: NodeJS.Timeout | null

}

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello!', read: false, timeout: null },
    { id: 2, text: 'Hey, you!', read: false, timeout: null },
    // mais mensagens...
  ]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.read ? msg : { ...msg, read: true }
      )
    )
  }, [])

  function handleReadMessage(messageId: number): void {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === messageId) {
          const timeout = setTimeout(() => {
            setMessages((currentMessages) =>
              currentMessages.filter((m) => m.id !== msg.id)
            );
          }, 5000);
          return { ...msg, read: true, timeout };
        }
        return msg;
      })
    );
  };
  const renderItem: ListRenderItem<Message> = ({ item }) => (
    <Message mensagem={item} onRead={handleReadMessage} />
  );
  function handleSendMessage() {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: Date.now(),
      text: newMessage,
      read: false,
      timeout: null
    }

    setMessages((prevMessages) => [...prevMessages, newMsg])
    setNewMessage('');
  }
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>Não há mensagens.</Text>}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="nova mensagem"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <Button title="Enviar" onPress={handleSendMessage} />
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
})
