import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import Grid from '@mui/material/Grid';

const ReceiptItem = ({ item }) => {
  const { updateItemQuantity, removeItemFromCart } = useCart();

  const handleQuantityChange = (event) => {
    let newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 0) {
      newQuantity = 0 // may need to handle errors here...
    }
    updateItemQuantity(item.id, newQuantity);
  };

  const incrementQuantity = () => {
    updateItemQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    updateItemQuantity(item.id, item.quantity - 1);
  };

  const handleRemoveItem = () => {
    removeItemFromCart(item.id);
  };

  return (
    <Box sx={{ borderBottom: '1px solid #eee', py: 1.5, px: 1 }}>
      <Grid container alignItems='center' spacing={1}>
        <Grid xs={5}>
          <Typography variant='subtitle2' component='div'>
            {item.name}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            ${item.price.toFixed(2)} c/u
          </Typography>
        </Grid>
        <Grid xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton onClick={decrementQuantity} size='smal' aria-label='decrementar'>
            <RemoveCircleOutlineIcon fontSize='small' />
          </IconButton>
          <TextField 
            type='number'
            value={item.quantity}
            onChange={handleQuantityChange}
            size='small'
            inputProps={{ style: { textAlign: 'center', width: '30px', MozAppearance: 'textfield' } }}
            sx={{ mx: 0.5, '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': { WebkitAppearance: 'none', margin: 0 } }}
          />
          <IconButton onClick={incrementQuantity} size='small' aria-label='increment'>
            <AddCircleOutlineIcon fontSize='small' />
          </IconButton>
        </Grid>
        <Grid xs={2} sx={{ textAlign: 'right' }}>
          <Typography variant='subtitle2' component='div'>
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Grid>
        <Grid xs={1} sx={{ textAlign: 'right' }}>
          <IconButton onClick={handleRemoveItem} size='small' color='error' aria-label='eliminar'>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );

};

export default ReceiptItem



