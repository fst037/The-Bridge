package TheBridge.TheBridgeNeo4jApiREST.models;

import TheBridge.TheBridgeNeo4jApiREST.pythonInterpreter.PythonInterpreter;
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.util.CoreMap;
import org.springframework.data.neo4j.core.schema.*;
import java.io.IOException;
import java.util.Properties;

@RelationshipProperties
public class Comment {

    @RelationshipId
    private String id;

    @Property
    private String mensaje;

    @Property
    private String timestamp;

    @Property
    private boolean visible;

    @TargetNode
    private User destinatario;

    public Comment(String mensaje, User destinatario) {
        this.mensaje = mensaje;
        this.destinatario = destinatario;
        this.timestamp = java.time.LocalDateTime.now().toString();
        this.visible = true;
    }

    public String getMensaje() {
        return mensaje;
    }

    public User getDestinatario() {
        return destinatario;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }


    public String valorarComentario(String comentario) throws IOException {

        String comentarioEnIngles = traducirComentario(comentario);

        Properties props = new Properties();
        props.setProperty("annotators", "tokenize, ssplit, pos, lemma, parse, sentiment");

        StanfordCoreNLP pipeline = new StanfordCoreNLP(props);

        Annotation document = new Annotation(comentarioEnIngles);
        pipeline.annotate(document);

        int totalSentimentScore = 0;
        int sentenceCount = 0;

        for (CoreMap sentence : document.get(CoreAnnotations.SentencesAnnotation.class)) {
            String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
            totalSentimentScore += getSentimentScore(sentiment);
            sentenceCount++;
        }

        if (sentenceCount == 0) {
            return "No Sentiment Found";
        }

        double averageSentimentScore = (double) totalSentimentScore / sentenceCount;
        return getSentimentLabel(averageSentimentScore);
    }


    private String traducirComentario(String comentario) throws IOException {
        PythonInterpreter pythonInterpreter = new PythonInterpreter();
        return pythonInterpreter.traductor(comentario);
    }


    private int getSentimentScore(String sentiment) {
        switch (sentiment.toLowerCase()) {
            case "very negative":
                return 0;
            case "negative":
                return 1;
            case "neutral":
                return 2;
            case "positive":
                return 3;
            case "very positive":
                return 4;
            default:
                return 2; // Neutral as default
        }
    }


    private String getSentimentLabel(double score) {
        if (score <= 0.5) {
            return "Very Negative";
        } else if (score <= 1.5) {
            return "Negative";
        } else if (score <= 2.5) {
            return "Neutral";
        } else if (score <= 3.5) {
            return "Positive";
        } else {
            return "Very Positive";
        }
    }
}