package handler;

import optimize.Optimizer;
import optimize.Player;

import java.util.*;

public class OptimizerHandler {
    public Map<Integer, String> handleRequest(Map<String, Object> input) {
        List<Player> playerList = new ArrayList<>();
        List<Player> whiteList = new ArrayList<>();
        List<Player> blackList = new ArrayList<>();
        List<String> lineupMatrix = new ArrayList<>();
        for (Object object : (List) input.get("players")) {
            Map playerMap = (Map) object;
            int playerId = (int) playerMap.get("playerId");
            String position = (String) playerMap.get("position");
            double projection = (double) playerMap.get("projection");
            int salary = (int) playerMap.get("salary");
            playerList.add(new Player(playerId, position, projection, salary));
        }
        for (Object object : (List) input.get("whiteList")) {
            Map playerMap = (Map) object;
            int playerId = (int) playerMap.get("playerId");
            whiteList.add(new Player(playerId));
        }
        for (Object object : (List) input.get("blackList")) {
            Map playerMap = (Map) object;
            int playerId = (int) playerMap.get("playerId");
            blackList.add(new Player(playerId));
        }
        for (Object object : (List) input.get("lineupMatrix")) {
            String position = (String) object;
            lineupMatrix.add(position);
        }
        int salaryCap = (int) input.get("salaryCap");
        List<Player> optimalLineup = new Optimizer(playerList, whiteList, blackList, lineupMatrix, salaryCap).optimize();
        Map<Integer, String> lineupResponse = new HashMap<>();
        optimalLineup.forEach(player -> lineupResponse.put(player.playerId, player.position));
        return lineupResponse;
    }
}