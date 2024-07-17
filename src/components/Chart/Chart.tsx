import React from "react";
import s from "./Chart.module.css";
import { connect } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { AppStateType } from "../../redux/store";
import { ChartDateType, MoodType, NoteType } from "../../types/types";

const renderCustomizedLabel: React.FC<any> = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

type MSTPType = {
  notes: NoteType[];
};

type MDTPType = {};

type OwnPropsType = {};

type PropsType = MSTPType & MDTPType & OwnPropsType;

const Chart: React.FC<PropsType> = ({ notes }) => {
  class ChartClass {
    public mood: number;
    // public date: number;
    public date: any;
    public label: any;

    constructor(chartDate: ChartDateType, mood: MoodType) {
      switch (mood) {
        case "awful":
          this.mood = 1;
          this.label = <>&#x1F61E;</>;
          break;
        case "bad":
          this.mood = 2;
          this.label = <>&#x1F614;</>;
          break;
        case "calm":
          this.mood = 3;
          this.label = <>&#x1F610;</>;
          break;
        case "good":
          this.mood = 4;
          this.label = <>&#x1F60C;</>;
          break;
        case "happy":
          this.mood = 5;
          this.label = <>&#x1F60A;</>;
          break;
      }
      this.date = `${chartDate.date}.${chartDate.month <= 10 ? 0 : undefined}${
        chartDate.month
      }.${chartDate.year.toString().slice(-2)}`;
    }
  }

  const data = notes
    .map((note) => {
      if (note.chartDate) return new ChartClass(note.chartDate, note.mood);
    })
    .reverse();

  return (
    <div>
      <ResponsiveContainer className={s.chart} width="80%" height={250}>
        <BarChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="date" />
          <Tooltip />
          <Legend />
          <Bar barSize={100} dataKey="mood" fill="#ffb02e">
            <LabelList
              position="center"
              dataKey="label"
              content={renderCustomizedLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const mapDispatchToProps = (state: AppStateType): MSTPType => ({
  notes: state.notesReducer.notes as NoteType[],
});

export default connect(mapDispatchToProps, null)(Chart);
