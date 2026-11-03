import {Component,type ReactNode,type ErrorInfo} from 'react';
type Props={children:ReactNode;fallback:ReactNode};type State={failed:boolean};
export default class ModelErrorBoundary extends Component<Props,State>{state:State={failed:false};static getDerivedStateFromError():State{return{failed:true}}componentDidCatch(error:Error,info:ErrorInfo){console.error('3D model render failed:',error.message,info.componentStack)}render(){return this.state.failed?this.props.fallback:this.props.children;}}
