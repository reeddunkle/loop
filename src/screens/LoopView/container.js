import { connect } from 'react-redux';
import { getLoopSelector } from '../../store/loops';
import LoopView from './component';

const mapStateToProps = state => ({
  collection: getLoopSelector(state)
});

export default connect(mapStateToProps)(LoopView);
