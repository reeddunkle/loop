import { connect } from 'react-redux';
import { getCollectionSelector } from '../../store/loops';
import LoopView from './LoopView';

const mapStateToProps = state => ({
  collection: getCollectionSelector(state)
});

export default connect(mapStateToProps)(LoopView);
