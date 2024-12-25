import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    (async () => {
      const jsonValue = await AsyncStorage.getItem('@tarefas');
      if (jsonValue) setTarefas(JSON.parse(jsonValue));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = (texto) => {
    const novaTarefa = { id: Date.now(), texto, concluida: false };
    setTarefas((antigas) => [...antigas, novaTarefa]);
  };

  const alternarConclusao = (id) => {
    setTarefas((antigas) =>
      antigas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  };

  const removerTarefa = (id) => {
    setTarefas((antigas) => antigas.filter((t) => t.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ tarefas, adicionarTarefa, alternarConclusao, removerTarefa }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
