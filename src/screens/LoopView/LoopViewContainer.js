import { connect } from 'react-redux';
import { createItem, deleteItem, collectionSelector } from '../../store/loops';
import { loopIdSelector } from '../../store/session';
import LoopView from './LoopView';

const mapStateToProps = state => ({
  collection: collectionSelector(state),
  loopId: loopIdSelector(state)
});

const mapDispatchToProps = {
  onAddItem: createItem,
  onDeleteItem: deleteItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoopView);
