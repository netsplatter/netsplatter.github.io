import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table, Pagination } from 'react-bootstrap';
import {createUltimatePagination, ITEM_TYPES} from 'react-ultimate-pagination';
import _ from 'underscore';
import uuid from 'uuid/v4';

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: ({value, isActive, onClick}) => (
    <Pagination.Item active={isActive} onClick={onClick}>{value}</Pagination.Item>
  ),
  [ITEM_TYPES.ELLIPSIS]: ({ isActive, onClick }) => (
    <Pagination.Ellipsis disabled={isActive} onClick={onClick} />
  ),
  [ITEM_TYPES.FIRST_PAGE_LINK]: ({ isActive, onClick }) => (
    <Pagination.First disabled={isActive} onClick={onClick} />
  ),
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: ({ isActive, onClick }) => (
    <Pagination.Prev disabled={isActive} onClick={onClick} />
  ),
  [ITEM_TYPES.NEXT_PAGE_LINK]: ({ isActive, onClick }) => (
    <Pagination.Next disabled={isActive} onClick={onClick} />
  ),
  [ITEM_TYPES.LAST_PAGE_LINK]: ({ isActive, onClick }) => (
    <Pagination.Last disabled={isActive} onClick={onClick} />
  ),
};

const UltimatePaginationComponent = createUltimatePagination({
  itemTypeToComponent: itemTypeToComponent,
  WrapperComponent: Pagination
});

export class UltimatePagination extends Component {
  render() {
    const {currentPage, totalPages, onChange} = this.props;

    return <UltimatePaginationComponent currentPage={currentPage} totalPages={totalPages} onChange={onChange} />;
  }
}

export const SortableHeader = ({children, className, style, field, sort, direction, onClick}) => {
  const getIcon = () => {
    if (!sort || !field) {
      return null;
    }
    if (field !== sort) {
      return null;
    }
    return <FontAwesomeIcon icon={direction === 'asc' ? faCaretUp : faCaretDown} />;
  };
  return (
    <th style={style}>
      <div className={`sortable-th ${className || ''}`} onClick={() => onClick(field)}>
        { children }
        { getIcon() }
      </div>
    </th>
  )
};

export class SortableTable extends Component {

  state = {
    sort: "id_User",
    direction: "asc"
  };

  changeSort = (sort) => {
    const { direction } = this.state;
    this.setState({sort, direction: direction === 'asc' ? 'desc' : 'asc'})
  };

  getIcon = (action, item) => {
    let icon = null;
    switch (action) {
      case 'edit':
        icon = <FontAwesomeIcon icon={faPen} onClick={() => this.props.onEdit && this.props.onEdit(item)} />;
        break;
      case 'delete':
        icon = <FontAwesomeIcon icon={faTrash} onClick={() => this.props.onDelete && this.props.onDelete(item)} />;
        break;
    }
    return icon;
  };

  render() {
    const { props, state, changeSort, getIcon } = this;
    const { headers, items } = props;
    const { sort, direction } = state;

    let sorted = _.sortBy(items, function(num) {
      return num[sort];
    });

    if (direction === 'desc') {
      sorted = sorted.reverse();
    }

    return (
      <Table hover responsive>
        <thead>
        <tr>
          {
            headers.map(item => {
              const key = uuid();
              if (item.action) {
                return <th key={key} width={40}/>;
              }
              if (item.sortable) {
                return <SortableHeader key={key} field={item.field} sort={sort} direction={direction} onClick={changeSort}>{item.name}</SortableHeader>
              }
              return <th key={key}>{item.name}</th>;
            })
          }
        </tr>
        </thead>
        <tbody>
        {
          sorted.map(item => {
            const key = uuid();
            return (
              <tr key={key}>
                {
                  headers.map(header => {
                    const key = uuid();
                    if (header.action) {
                      return (
                        <td key={key}>
                          { getIcon(header.action, item) }
                        </td>
                      );
                    }
                    return <td key={key}>{ header.format ? header.format(item[header.field]) : item[header.field] }</td>;
                  })
                }
              </tr>
            );
          })
        }
        </tbody>
      </Table>
    )
  }
}