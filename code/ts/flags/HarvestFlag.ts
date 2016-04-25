/// <reference path="../vars/Globals.ts" />
/// <reference path="../utils/Inventory.ts" />
/// <reference path="BaseFlag.ts" />
"use strict";
class HarvestFlag extends BaseFlag {
    public flag_name = 'Harvest';
    public flag: Flag;
    protected min_ticks = 7500;

    constructor(flag: Flag) {
        super(flag);
    }

    getMaxCreepCount() {
        let flag_creeps = {
            // 'Runner': 1,
            'RangeGuard': 1,
        };
        if (this.flag.room) {
            let room = this.flag.room;
            let sources = Inventory.room_sources(room),
                containers = Inventory.room_structure_count('container', room);
            
            if (room.controller && (!room.controller.reservation && !room.controller.owner) || room.controller.ticksToDowngrade < this.min_ticks) {
                flag_creeps['Claim'] = 1;
            }
            if (room.memory.constructing){
                flag_creeps['Runner'] = 1;
            }
            if (containers > 0 || !room.memory.constructing) {
                //if containers are ready, go for it, or if there's no plans to make anything, just go for it
                flag_creeps['RangeHarvester'] = sources;
                flag_creeps['RangeCourier'] = sources * 2;
                flag_creeps['Repair'] = containers > 0 ? 1 : 0;
            }
            // else {
            //     flag_creeps['Runner'] = 1; //make a generic creep instead
            // }

        }

        // if (!target_room) { // || target_room.controller [claim timer is low]
        //     flag_creeps['Claim'] = 1;
        // } else {
        //     flag_creeps['Harvester'] = Inventory.room_sources(target_room);
        //     flag_creeps['Builder'] = target_room.memory.constructing > 0 ? 1 : 0;
        //     // flag_creeps['Courier'] = Inventory.room_sources(target_room) * 4;
        // }
        return flag_creeps;
    }
}
FlagTypes['Harvest'] = HarvestFlag;