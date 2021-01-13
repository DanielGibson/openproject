//-- copyright
// OpenProject is an open source project management software.
// Copyright (C) 2012-2021 the OpenProject GmbH
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See docs/COPYRIGHT.rdoc for more details.
//++

import {APIv3ResourceCollection, APIv3ResourcePath} from "core-app/modules/apiv3/paths/apiv3-resource";
import {Injector} from "@angular/core";
import {StatusResource} from "core-app/modules/hal/resources/status-resource";
import {APIv3StatusPaths} from "core-app/modules/apiv3/endpoints/statuses/apiv3-status-paths";
import {Observable} from "rxjs";
import {CollectionResource} from "core-app/modules/hal/resources/collection-resource";
import {tap} from "rxjs/operators";
import {APIV3Service} from "core-app/modules/apiv3/api-v3.service";

export class APIv3StatusesPaths extends APIv3ResourceCollection<StatusResource, APIv3StatusPaths> {
  constructor(protected apiRoot:APIV3Service,
              protected basePath:string) {
    super(apiRoot, basePath, 'statuses', APIv3StatusPaths);
  }

  /**
   * Perform a request to the HalResourceService with the current path
   */
  public get():Observable<CollectionResource<StatusResource>> {
    return this
      .halResourceService
      .get<CollectionResource<StatusResource>>(this.path)
      .pipe(
        tap(collection => {
          collection.elements.forEach((resource, id) => {
            this.id(resource.id!).cache.updateValue(resource.id!, resource);
          });
        })
      );
  }

}
