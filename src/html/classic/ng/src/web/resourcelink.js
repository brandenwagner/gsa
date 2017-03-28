/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2017 Greenbone Networks GmbH
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

import _ from '../locale.js';

import LegacyLink from './legacylink.js';
import PropTypes from './proptypes.js';

export const ResourceLink = ({
    resource,
    ...props,
  }) => {
  const {type, id, trash, name} = resource;

  if (trash === '1') {
    return (
      <span>
        {name} (<span>in </span>
        <LegacyLink
          cmd="get_trash">
          {_('Trashcan')}
        </LegacyLink>)
      </span>
    );
  }

  let cmd;
  let id_name;
  let other = {};

  if (type === 'cve' || type === 'cpe' || type === 'ovaldef' ||
    type === 'cert_bund_adv' || type === 'dfn_cert_adv') {
    id_name = 'info_id';
    cmd = 'get_info';
    other.info_type = type;
  }
  else if (type === 'nvt') {
    id_name = 'info_id';
    cmd = 'get_info';
    other.info_type = type;
    other.details = '1';
  }
  else if (type === 'host' || type === 'os') {
    id_name = 'asset_id';
    cmd = 'get_asset';
    other.asset_type = type;
  }
  else {
    id_name = type + '_id';
    cmd = 'get_' + type;
  }
  props[id_name] = id;
  return (
    <LegacyLink
      {...props}
      {...other}
      cmd={cmd}>
      {name}
    </LegacyLink>
  );
};

ResourceLink.propTypes = {
  resource: PropTypes.model.isRequired,
};


export default ResourceLink;

// vim: set ts=2 sw=2 tw=80: