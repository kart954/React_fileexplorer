import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';

const data = {
  '/Hospital': {
    path: '/Hospital',
    type: 'folder',
    isRoot: true,
    children: ['/Hospital/Medicine', '/Hospital/Beds'],
  },
  '/Hospital/Medicine': {
    path: '/Hospital/Medicine',
    type: 'folder',
    children: ['/Hospital/Medicine/readme.md'],
  },
  '/Hospital/Medicine/readme.md': {
    path: '/Hospital/Medicine/Availability',
    type: 'file',
    content: 'Thanks for Looking.  there is Availabity here.'
  },
  '/Hospital/Beds': {
    path: '/Hospital/Beds',
    type: 'folder',
    children: ['/Hospital/Beds/Normal Beds', '/Hospital/Beds/Oxygen Beds'],
  },
  '/Hospital/Beds/Normal Beds': {
    path: '/Hospital/Beds/Normal Beds',
    type: 'folder',
    children: ['/Hospital/Beds/Normal Beds/Available'],
  },
  '/Hospital/Beds/Normal Beds/Available': {
    path: '/Hospital/Beds/Normal Beds/Available',
    type: 'folder',
    children: [],
  },
  '/Hospital/Beds/Oxygen Beds': {
    path: '/Hospital/Beds/Oxygen Beds',
    type: 'folder',
    children: ['/Hospital/Beds/Oxygen Beds'],
  },

};

export default class Tree extends Component {

  state = {
    nodes: data,
  };

  getRootNodes = () => {
    const { nodes } = this.state;
    return values(nodes).filter(node => node.isRoot === true);
  }

  getChildNodes = (node) => {
    const { nodes } = this.state;
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  }  

  onToggle = (node) => {
    const { nodes } = this.state;
    nodes[node.path].isOpen = !node.isOpen;
    this.setState({ nodes });
  }

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  }

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <div>
        { rootNodes.map(node => (
          <TreeNode 
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    )
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};