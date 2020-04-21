package net.evrem.webapp.enums;

/**
 * Created by t945051 on 6.7.2015.
 */
public enum Icon {
    SMILE("smile-o"),BEER("beer"), BINOCULARS("binoculars"), BOOK("book"), BULLHORN("bullhorn"), CHILD("child"),
    CREDIT_CARD("credit-card"), CUBE("cube"), FILM("film"), FLAG("flag"), FOOTBALL("futbol-o"), GIFT("gift"),
    MUSIC("music"), GRADUATION_CAP("graduation-cap"), HEART("heart"), COMMENTS("comments"), BUG("bug"),
    PAW("paw"), PICTURE("picture-o"), RECYCLE("recycle"), WRENCH("wrench"), STAR("star"), TAG("tag"), CART("shopping-cart"),
    QUESTION("question"), EXCLAMATION("exclamation"), DOCTOR("user-md"), TREE("tree"), BRIEFCASE("briefcase"), BOMB("bomb");

    Icon(String type){
        this.type = type;
    }
    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
