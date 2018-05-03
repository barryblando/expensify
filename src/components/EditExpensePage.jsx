import React from 'react';

const EditExpensePage = (props) => {
  // React Router pass props object to components
  // so that it can be manipulate dynamically
  console.log(props);
  return (
    <div>
      Editing the expense with id of { props.match.params.id }
    </div>
  );
};

export default EditExpensePage;