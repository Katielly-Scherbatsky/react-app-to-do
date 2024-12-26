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
import { Picker } from '@react-native-picker/picker';

const HomeScreen = () => {
  const { tarefas, adicionarTarefa, alternarConclusao, removerTarefa } =
    useContext(TodoContext);
  const [texto, setTexto] = useState('');
  const [filtro, setFiltro] = useState('todos');

  const handleAdd = () => {
    if (texto.trim()) {
      adicionarTarefa(texto);
      setTexto('');
    }
  };

  const filtrarTarefas = () => {
    if (filtro === 'concluidas') return tarefas.filter((t) => t.concluida);
    if (filtro === 'pendentes') return tarefas.filter((t) => !t.concluida);
    return tarefas;
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtroContainer}>
        <Picker
          selectedValue={filtro}
          onValueChange={(itemValue) => setFiltro(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Todos" value="todos" />
          <Picker.Item label="Concluídas" value="concluidas" />
          <Picker.Item label="Pendentes" value="pendentes" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua tarefa..."
          onChangeText={setTexto}
          value={texto}
        />
        <TouchableOpacity
          style={[
            styles.botao,
            !texto.trim() && styles.botaoDesativado,
          ]}
          onPress={handleAdd}
          disabled={!texto.trim()}
        >
          <Text style={styles.botaoTexto}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtrarTarefas()}
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
  filtroContainer: { marginBottom: 20 },
  picker: { height: 40, backgroundColor: '#f0f0f0', borderRadius: 5 },
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
  botaoDesativado: {
    backgroundColor: '#ccc',
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
