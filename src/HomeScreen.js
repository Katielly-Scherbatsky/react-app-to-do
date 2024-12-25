import React, { useContext, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { TodoContext } from './TodoContext';

const HomeScreen = () => {
  const { tarefas, adicionarTarefa, alternarConclusao, removerTarefa } =
    useContext(TodoContext);
  const [texto, setTexto] = useState('');

  const handleAdd = () => {
    if (texto.trim()) {
      adicionarTarefa(texto);
      setTexto('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua tarefa..."
          onChangeText={setTexto}
          value={texto}
        />
        <TouchableOpacity style={styles.botao} onPress={handleAdd}>
          <Text style={styles.botaoTexto}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => alternarConclusao(item.id)}>
              <Text
                style={[styles.itemTexto, item.concluida && styles.concluida]}
              >
                {item.texto}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.remover}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
  botao: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 5,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemTexto: { fontSize: 16 },
  concluida: { textDecorationLine: 'line-through', color: '#888' },
  remover: { color: 'red', fontWeight: 'bold', marginLeft: 10 },
});

export default HomeScreen;
