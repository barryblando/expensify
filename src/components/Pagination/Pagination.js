import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
};

const defaultProps = {
  initialPage: 1,
  pageSize: 5,
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {},
    };
  }

  componentDidMount() {
    const { items, initialPage } = this.props;

    // set page if items array isn't empty
    if (items && items.length) {
      this.setPage(initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { items, initialPage } = this.props;

    // reset page if items array has changed
    if (items !== prevProps.items) {
      this.setPage(initialPage);
    }
  }

  setPage = page => {
    const { items, pageSize, onChangePage } = this.props;
    let { pager } = this.state;

    // if (page < 0 || page > pager.totalPages) {
    //   return;
    // }

    // get new pager object for specified page
    pager = this.getPager(items.length, page, pageSize);

    // get new page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager });

    // call change page function in parent component
    onChangePage(pageOfItems);
  };

  // default to first page = 1 & page size is 10
  getPager = (totalItems, currentPage = 1, pageSize = 5) => {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage;
    let endPage;

    /* eslint-disable */
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    /* eslint-enable */

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  };

  render() {
    const { pager } = this.state;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <ul className="pagination">
        <li>
          <button type="button" onClick={() => this.setPage(1)} disabled={pager.currentPage === 1}>
            {'<<'}
          </button>
        </li>
        <li>
          <button type="button" onClick={() => this.setPage(pager.currentPage - 1)} disabled={pager.currentPage === 1}>
            Prev
          </button>
        </li>
        {pager.pages.map(page => (
          <li key={page} className={pager.currentPage === page ? 'active' : ''}>
            <button type="button" onClick={() => this.setPage(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <button
            type="button"
            onClick={() => this.setPage(pager.currentPage + 1)}
            disabled={pager.currentPage === pager.totalPages}
          >
            Next
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => this.setPage(pager.totalPages)}
            disabled={pager.currentPage === pager.totalPages}
          >
            {'>>'}
          </button>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
