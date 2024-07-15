package TheBridge.TheBridgeNeo4jApiREST.pythonInterpreter;

import org.python.jline.internal.InputStreamReader;

import java.io.BufferedReader;
import java.io.File;

public class PythonInterpreter {

    public void HolaMundoPy() {
        org.python.util.PythonInterpreter interpreter = new org.python.util.PythonInterpreter();
        interpreter.exec("print('Hola desde Python')");
    }

    public String traductor(String text) {
        try {

            String lang = "en";
            String osName = System.getProperty("os.name").toLowerCase();
            String userDir = System.getProperty("user.dir");
            File currentDir = new File(userDir);
            String parentDir = currentDir.getParent();
            String pythonInterpreter;
            String pythonScript;

            if (osName.contains("win")) {
                pythonInterpreter = parentDir + "\\venvWin\\myenv\\Scripts\\python.exe";
                pythonScript = parentDir + "\\serviciosPython\\traductor.py";
            } else {
                pythonInterpreter = parentDir + "/venv/bin/python3";
                pythonScript = parentDir + "/serviciosPython/traductor.py";
            }

            ProcessBuilder pb = new ProcessBuilder(pythonInterpreter, pythonScript, text, lang);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String lineaTraducida = reader.readLine();

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                return lineaTraducida;
            } else {
                System.out.println(exitCode);
                System.err.println("Error al ejecutar el script Python.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
