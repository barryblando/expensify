/* eslint-disable */
/**
 *
 * Keys help React identify which items have changed, are added, or are removed.
 * Keys should be given to the elements inside the array to give the elements a stable identity.
 */
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const { numbers } = { props };
  const listItems = numbers.map(number => (
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(<NumberList numbers={numbers} />, document.getElementById('app'));
