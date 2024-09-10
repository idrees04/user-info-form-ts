import React, { useState } from 'react';
import UserForm from './components/UserForm';
import { Container, Typography } from '@mui/material';
import { Provider } from 'react-redux';
import store from './redux/store';
import FormModal from './components/FormModal';

const App: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Provider store={store}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          User Information Form
        </Typography>
        <UserForm openModal={handleOpenModal} />
        <FormModal open={openModal} handleClose={handleCloseModal} />
      </Container>
    </Provider>
  );
};

export default App;
