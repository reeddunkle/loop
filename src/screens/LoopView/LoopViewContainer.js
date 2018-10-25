import { connect } from 'react-redux';
import {
  createItem,
  deleteItem,
  getCollectionSelector
} from '../../store/loops';
import LoopView from './LoopView';

const mapStateToProps = state => ({
  collection: getCollectionSelector(state)
});

const mapDispatchToProps = {
  onAddItem: createItem,
  onDeleteItem: deleteItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoopView);
