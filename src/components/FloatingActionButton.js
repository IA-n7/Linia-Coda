import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


const FloatingActionButton = (props) => {
  return (
    <Button variant="fab" color="secondary" aria-label="Submit" type="submit">
      <AddIcon />
    </Button>
    );
}

export default FloatingActionButton