package optimize;

import java.util.*;
import java.util.stream.Collectors;

public class Adjuster {

    public List<Player> getWhiteList(List<Player> lineup) {
        return lineup.stream().filter(player -> player.playerId > 0).collect(Collectors.toList());
    }

    public List<Player> adjustPlayerPool(List<Player> playerPool, List<Player> whiteList, List<Player> blackList) {
        return playerPool
                .stream()
                .filter(player -> player.projection > 0 && !whiteList.contains(player) && !blackList.contains(player))
                .collect(Collectors.toList());
    }

    public List<String> adjustLineupPositions(List<Player> lineup, List<String> startingPositions) {
        List<String> adjustedLineupPositions = new ArrayList<>();
        for (int i = 0; i < startingPositions.size(); i++) {
            if (lineup.get(i).playerId == 0) {
                adjustedLineupPositions.add(startingPositions.get(i));
            }
        }
        return adjustedLineupPositions;
    }

    public LineupRestrictions adjustLineupRestrictions(LineupRestrictions lineupRestrictions, List<Player> whiteList) {
        List<String> whiteListedTeams = whiteList
                .stream()
                .filter(player -> !player.position.equals(lineupRestrictions.getTeamAgnosticPosition()))
                .map(player -> player.team)
                .collect(Collectors.toList());
        lineupRestrictions.setWhiteListedTeams(whiteListedTeams);
        return lineupRestrictions;
    }

    public int adjustSalaryCap(List<Player> whiteList, int startingSalaryCap) {
        return startingSalaryCap - whiteList.stream().mapToInt(player -> player.salary).sum();
    }
}
