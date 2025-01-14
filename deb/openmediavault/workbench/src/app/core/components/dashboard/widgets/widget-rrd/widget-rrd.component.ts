/**
 * This file is part of OpenMediaVault.
 *
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2022 Volker Theile
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
import { Component } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';

import { AbstractDashboardWidgetComponent } from '~/app/core/components/dashboard/widgets/abstract-dashboard-widget-component';
import { unixTimeStamp } from '~/app/functions.helper';

@Component({
  selector: 'omv-dashboard-widget-rrd',
  templateUrl: './widget-rrd.component.html',
  styleUrls: ['./widget-rrd.component.scss']
})
export class WidgetRrdComponent extends AbstractDashboardWidgetComponent<number> {
  public time: number;

  constructor() {
    super();
    this.subscriptions.add(
      this.loadDataEvent.subscribe((time: number) => {
        this.time = time;
      })
    );
  }

  protected sanitizeConfig() {
    super.sanitizeConfig();
    _.defaultsDeep(this.config, {
      reloadPeriod: 60000,
      rrd: {
        name: 'undefined.png'
      }
    });
  }

  protected loadData(): Observable<number> {
    // Angular CD will detect this and redraws the widget using the
    // latest graph image.
    return of(unixTimeStamp());
  }
}
