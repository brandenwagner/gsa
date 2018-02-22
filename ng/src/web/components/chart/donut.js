/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2018 Greenbone Networks GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import React from 'react';

import Layout from '../layout/layout';

import PropTypes from '../../utils/proptypes';

import Legend from './legend';
import Pie from './pie';

const Label = ({
  x,
  y,
  children,
}) => (
  <text
    fill="white"
    textAnchor="middle"
    x={x}
    y={y}
    dy=".33em"
    fontSize="12px"
    fontWeight="bold"
  >
    {children}
  </text>
);

Label.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

const Arc = ({
  path,
  color,
  startAngle,
  endAngle,
  label,
  x,
  y,
}) => (
  <g>
    <path
      d={path}
      fill={color}
    />
    {endAngle - startAngle > 0.1 &&
      <Label
        x={x}
        y={y}
      >
        {label}
      </Label>
    }
  </g>
);

Arc.propTypes = {
  color: PropTypes.string,
  endAngle: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  startAngle: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

const DONUT_WIDTH = 60;

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

const DonutChart = ({
  data,
  height,
  width,
}) => {
  const radius = (height - margin.top) / 2;
  return (
    <Layout align={['start', 'start']}>
      <svg width={width} height={height}>
        <Pie
          data={data}
          top={height / 2}
          left={width / 2}
          pieValue={d => d.value}
          outerRadius={radius}
          innerRadius={radius - DONUT_WIDTH}
          cornerRadius={3}
          padAngle={0.01}
        >
          {({
            index,
            data: arcData,
            ...props
          }) => (
            <Arc
              key={`pie-arc-${index}`}
              color={arcData.color}
              label={arcData.value}
              {...props}
            />
          )}
        </Pie>
      </svg>
      <Legend data={data}/>
    </Layout>
  );
};

DonutChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default DonutChart;

// vim: set ts=2 sw=2 tw=80:
