import ProgressBar from "@/components/progress";
import { POKEMON_STAT_LABLES } from "@/constants/stats";
import { PokemonStats } from "@/types/pokemon";

function PokemonStatus({ stats }: { stats?: PokemonStats[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="capitalize text-2xl">Stats</h1>
      <div className="flex flex-col gap-2">
        {stats?.map((stat) => (
          <StatusBar
            label={POKEMON_STAT_LABLES[stat.stat.name]}
            value={stat.base_stat}
          />
        ))}
      </div>
    </div>
  );
}

function StatusBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ gridTemplateColumns: "60px 1fr" }} className="grid gap-4">
      <span>{label}</span>
      <div className="w-[260px]">
        <ProgressBar max={255} value={value} />
      </div>
    </div>
  );
}

export default PokemonStatus;
