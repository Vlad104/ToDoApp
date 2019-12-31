import React from "react";

import './Time.css';

interface ITimeProps {
  className?: string;
}

interface ITimeState {
  time: string;
  date: string;
}

export class Time extends React.Component<ITimeProps, ITimeState> {
  private updateInterval = 30 * 1000;

  constructor(props: ITimeProps) {
    super(props);
    this.state = { time: "", date: "" };
  }

  public componentDidMount() {
    this.getDateTime();
    setInterval(this.getDateTime, this.updateInterval);
  }

  public render() {
    return (
      <div className={`time ${this.props.className}`}>
        <a>{this.state.time}</a>
        <a>{this.state.date}</a>
      </div>
    );
  }

  private getDateTime = () => {
    const d = new Date();
    const time = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
    const date = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2);
    this.setState({time, date});
  }
}
