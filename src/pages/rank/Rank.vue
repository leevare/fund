<template>
  <table>
    <colgroup>
      <col style="width: 10px" />
      <col style="width: 80px" />
      <col style="width: 150px" />
      <col style="width: 110px" />
    </colgroup>
    <tr>
      <th>序号</th>
      <th>基金代码</th>
      <th>基金简称</th>
      <th>日期</th>
      <th>单位净值</th>
      <th>累计净值</th>
      <th>日增长率</th>
      <th>近1周</th>
      <th>近1月</th>
      <th>近3月</th>
      <th>近6月</th>
      <th>近1年</th>
      <th>近2年</th>
      <th>近3年</th>
      <th>今年来</th>
      <th>成立来</th>
      <th>手续费</th>
    </tr>
    <tr v-for="(item, index) in rankList" :key="index">
      <td>{{ item.index }}</td>
      <td>{{ item.code }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.date }}</td>
      <td :class="[getColor(item.dwjz)]">{{ item.dwjz }}</td>
      <td :class="[getColor(item.ljjz)]">{{ item.ljjz }}</td>
      <td :class="[getColor(item.rzzl)]">{{ getRenderPercent(item.rzzl) }}</td>
      <td :class="[getColor(item.recent1w)]">{{ getRenderPercent(item.recent1w) }}</td>
      <td :class="[getColor(item.recent1m)]">{{ getRenderPercent(item.recent1m) }}</td>
      <td :class="[getColor(item.recent3m)]">{{ getRenderPercent(item.recent3m) }}</td>
      <td :class="[getColor(item.recent6m)]">{{ getRenderPercent(item.recent6m) }}</td>
      <td :class="[getColor(item.recent1y)]">{{ getRenderPercent(item.recent1y) }}</td>
      <td :class="[getColor(item.recent2y)]">{{ getRenderPercent(item.recent2y) }}</td>
      <td :class="[getColor(item.recent3y)]">{{ getRenderPercent(item.recent3y) }}</td>
      <td :class="[getColor(item.recenty)]">{{ getRenderPercent(item.recenty) }}</td>
      <td :class="[getColor(item.recent_y)]">{{ getRenderPercent(item.recent_y) }}</td>
      <td>{{ item.handling_fee }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios, { AxiosResponse } from 'axios';

type RankData = {
  allNum: number;
  allPages: number;
  allRecords: number;
  bbNum: number;
  datas: string[];
  etfNum: number;
  fofNum: number;
  gpNum: number;
  hhNum: number;
  lofNum: number;
  pageIndex: number;
  pageNum: number;
  qdiiNum: number;
  zqNum: number;
  zsNum: number;
};

type RankList = {
  index: number;
  /** 基金代码 */
  code: string;
  /** 基金简称 */
  name: string;
  /** 日期 */
  date: string;
  /** 单位净值 */
  dwjz: string;
  /** 累计净值 */
  ljjz: string;
  /** 日增长率 */
  rzzl: string;
  /** 近1周 */
  recent1w: string;
  /** 近1月 */
  recent1m: string;
  /** 近3月 */
  recent3m: string;
  /** 近6月 */
  recent6m: string;
  /** 近1年 */
  recent1y: string;
  /** 近2年 */
  recent2y: string;
  /** 近3年 */
  recent3y: string;
  /** 今年来 */
  recenty: string;
  /** 成立来 */
  recent_y: string;
  /** 手续费 */
  handling_fee: string;
  /** 可购买 */
  can_by: string;
};

export default defineComponent({
  setup() {
    const rankList = ref<RankList[]>([]);
    const page = ref(1);
    axios
      .get<RankData>('/fund/data/rankhandler.aspx', {
        params: {
          op: 'ph',
          dt: 'kf',
          ft: 'all',
          rs: '',
          gs: 0,
          sc: 'zzf',
          st: 'desc',
          sd: '2019-09-21',
          ed: '2020-09-21',
          qdii: '',
          tabSubtype: ',,,,,',
          pi: page.value,
          pn: 50,
          dx: 1,
          v: Math.random(),
        },
      })
      .then((res: AxiosResponse<RankData>) => {
        let data;
        eval(`${res.data}data=rankData`);
        rankList.value = data.datas.map((item, index) => {
          const [
            code,
            name,
            ,
            date,
            dwjz,
            ljjz,
            rzzl,
            recent1w,
            recent1m,
            recent3m,
            recent6m,
            recent1y,
            recent2y,
            recent3y,
            recenty,
            recent_y,
            ,
            ,
            ,
            ,
            handling_fee,
            can_by,
          ] = item.split(',');
          return {
            index: (page.value - 1) * 50 + index + 1,
            code,
            name,
            date,
            dwjz,
            ljjz,
            rzzl,
            recent1w,
            recent1m,
            recent3m,
            recent6m,
            recent1y,
            recent2y,
            recent3y,
            recenty,
            recent_y,
            handling_fee,
            can_by,
          };
        });
      });

    const getColor = (value: string | number) => {
      if (value > 0) {
        return 'red';
      } else if (value < 0) {
        return 'grw';
      }
    };

    const getRenderPercent = (value: string) => {
      if (!value) return '-';
      return `${value}%`;
    };

    return { rankList, getColor, getRenderPercent };
  },
});
</script>

<style scoped lang="less">
.red {
  color: #dc0000;
}
.grw {
  color: #097c25;
}
table {
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 13px;
  th {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    padding-top: 6px;
    padding-bottom: 6px;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    transition: background 0.3s ease;
  }
  td {
    position: relative;
    padding: 8px;
    border: 1px solid #f0f0f0;
    transition: background 0.3s;
    white-space: normal;
  }
}
</style>
