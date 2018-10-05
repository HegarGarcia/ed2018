import React, { Component } from 'react';
import './style.css';

import { Card, Input, Radio, Divider, List, Button } from 'antd';
import math from '../lib/math';

const RadioGroup = Radio.Group;

export class Math extends Component {
  constructor() {
    super();
    this.state = { algorithm: 'toInfix', expression: '', history: [] };
  }

  handleInput = event => {
    const expression = event.target.value;
    this.setState(() => ({ ...this.state, expression }));
  };

  handleRadioChange = event => {
    const algorithm = event.target.value;
    this.setState(() => ({ ...this.state, algorithm }));
  };

  runAlgorithm = () => {
    const { algorithm, expression } = this.state;
    try {
      const history = math[algorithm](expression, true);
      this.setState(() => ({ ...this.state, history }));
    } catch (error) {
      console.error(error);
      this.setState(() => ({ ...this.state, history: ['error'] }));
    }
  };

  render() {
    return (
      <Card title="Notación Polaca" style={{ width: '50vw' }}>
        <div className="inputDivider">
          <Input placeholder="Expresión" onChange={this.handleInput} />
          <Button type="primary" onClick={this.runAlgorithm}>
            Run
          </Button>
        </div>
        <Divider />
        <RadioGroup
          onChange={this.handleRadioChange}
          value={this.state.algorithm}
        >
          <Radio value={'toInfix'}>Infijo</Radio>
          <Radio value={'toPrefix'}>Prefijo</Radio>
          <Radio value={'toPostfix'}>Postfijo</Radio>
        </RadioGroup>
        <Divider />
        <List
          bordered
          dataSource={this.state.history}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Card>
    );
  }
}
