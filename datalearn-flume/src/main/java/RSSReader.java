import org.w3c.dom.CharacterData;
import org.w3c.dom.*;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.net.URL;

public class RSSReader {

    private static RSSReader instance = null;

    public RSSReader() {
    }

    public static RSSReader getInstance() {
        if (instance == null) {
            instance = new RSSReader();
        }
        return instance;
    }

    public void writeNews() {
        try {
            DocumentBuilder builder = DocumentBuilderFactory.newInstance().
                    newDocumentBuilder();
            URL u = new URL("http://feeds.bbci.co.uk/news/world/rss.xml?edition=uk#");
            Document doc = builder.parse(u.openStream());
            NodeList nodes = doc.getElementsByTagName("item");
            for (int i = 0; i < nodes.getLength(); i++) {
                Element element = (Element) nodes.item(i);
                System.out.println("Title: " + getElementValue(element, "title"));
                System.out.println("Link: " + getElementValue(element, "link"));
                System.out.println("Publish Date: " + getElementValue(element, "pubDate"));
                System.out.println("author: " + getElementValue(element, "dc:creator"));
                System.out.println("comments: " + getElementValue(element, "wfw:comment"));
                System.out.println("description: " + getElementValue(element, "description"));
                System.out.println();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private String getCharacterDataFromElement(Element e) {
        if (e == null) {
            return "";
        }
        try {
            Node child = e.getFirstChild();
            if (child instanceof CharacterData) {
                CharacterData cd = (CharacterData) child;
                return cd.getData();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return "";
    }

    private String getElementValue(Element parent, String label) {
        return getCharacterDataFromElement((Element) parent.getElementsByTagName(label).item(0));
    }

    public static void main(String[] args) {
        RSSReader reader = RSSReader.getInstance();
        reader.writeNews();
    }
}
