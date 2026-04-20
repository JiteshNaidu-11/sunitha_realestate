import { PropertyUnitConfigurations, PropertyUnitVariant } from "@/data/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const nf = new Intl.NumberFormat("en-IN");

function formatSqFt(n: number) {
  return `${nf.format(n)} sq.ft`;
}

function maxBuiltUp(variants: PropertyUnitVariant[]) {
  return Math.max(...variants.map((v) => v.builtUpSqFt));
}

interface PropertyUnitConfigurationSectionProps {
  data: PropertyUnitConfigurations;
}

const PropertyUnitConfigurationSection = ({ data }: PropertyUnitConfigurationSectionProps) => {
  if (!data.groups.length) return null;

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h2 className="font-display text-2xl font-bold text-card-foreground mb-4">Unit configurations</h2>

      {(data.propertyTypeLine || data.configurationsSummary) && (
        <div className="space-y-2 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
          {data.propertyTypeLine ? (
            <p>
              <span className="font-medium text-card-foreground">Property type: </span>
              {data.propertyTypeLine}
            </p>
          ) : null}
          {data.configurationsSummary ? (
            <p>
              <span className="font-medium text-card-foreground">Configurations available: </span>
              {data.configurationsSummary}
            </p>
          ) : null}
        </div>
      )}

      <div className="space-y-10">
        {data.groups.map((group) => {
          const top = maxBuiltUp(group.variants);
          return (
            <div key={group.label} className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-xl font-semibold text-card-foreground">{group.label}</h3>
                <span className="text-xs text-muted-foreground">
                  ({group.variants.length} layout{group.variants.length === 1 ? "" : "s"})
                </span>
              </div>
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-secondary/40">
                      <TableHead className="w-[45%] md:w-[40%]">Built-up area</TableHead>
                      <TableHead className="w-[45%] md:w-[40%]">Carpet area</TableHead>
                      <TableHead className="text-right md:text-left w-[10%] min-w-[5rem]" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.variants.map((row, idx) => {
                      const isLargest = row.builtUpSqFt === top;
                      return (
                        <TableRow
                          key={`${group.label}-${row.builtUpSqFt}-${row.carpetSqFt}-${idx}`}
                          className={cn(isLargest && "bg-secondary/35 border-l-4 border-l-gold hover:bg-secondary/45")}
                        >
                          <TableCell className="font-medium text-card-foreground">{formatSqFt(row.builtUpSqFt)}</TableCell>
                          <TableCell className="text-card-foreground">{formatSqFt(row.carpetSqFt)}</TableCell>
                          <TableCell className="text-right md:text-left">
                            {isLargest ? (
                              <Badge variant="outline" className="border-gold/60 text-gold whitespace-nowrap">
                                Premium size
                              </Badge>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          );
        })}
      </div>

      {data.disclaimer ? (
        <p className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground leading-relaxed">{data.disclaimer}</p>
      ) : null}
    </div>
  );
};

export default PropertyUnitConfigurationSection;
