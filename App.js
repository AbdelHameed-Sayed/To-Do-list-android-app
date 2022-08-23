import React, {Fragment} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import ToDo from './components/ToDo';

const App = () => {
  return (
    <Fragment>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtULfEOi4BVDX5tCpEMCnhYvcecKdXQaqSkB0OoxKQ8uf_AnPZshEKVDgSDfFSvA_I2-Q&usqp=CAU',
          }}
          style={[styles.image, styles.image2]}
        />

        <ToDo />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(49, 139, 218)',
    height: '100%',
  },
});

export default App;
