package net.evrem.webapp.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;


/**
 * Class for encrypting/decrypting data with the 3DES algorithm
 * 
 */
public class Encrypter {
	Cipher ecipher;
	Cipher dcipher;

	private final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * The constructor method.
	 * 
	 * @param keyData
	 *            24 characters long
	 * @param paramData
	 *            8 characters long
	 */
	public Encrypter(String keyData, String paramData) {
		if (keyData == null || paramData == null) {
			throw new IllegalArgumentException("Parameters must not be null");
		}

		if (keyData.length() != 24) {
			throw new IllegalArgumentException("Size of encryption key must be 24, but was: " + keyData.length());
		}

		if (paramData.length() != 8) {
			throw new IllegalArgumentException("Size of encryption param must be 8, but was: " + keyData.length());
		}

		try {
			SecretKeySpec key = new SecretKeySpec(keyData.getBytes(), "DESede");
			IvParameterSpec paramSpec = new javax.crypto.spec.IvParameterSpec(paramData.getBytes());
			// DESede/CBC
			// ecipher = Cipher.getInstance("DESede");
			ecipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
			dcipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");

			// Create the ciphers
			ecipher.init(Cipher.ENCRYPT_MODE, key, paramSpec);
			dcipher.init(Cipher.DECRYPT_MODE, key, paramSpec);
		} catch (Exception e) {
			logger.error("Error initializing encrypter.", e);
		}
	}

	/**
	 * Encrypts the input.
	 * 
	 * @param str
	 * @return the encrypted input.
	 */
	public String encrypt(String str) {
		try {
			// Encode the string into bytes using utf-8
			byte[] utf8 = str.getBytes("UTF8");

			// Encrypt
			byte[] enc = ecipher.doFinal(utf8);

			// Encode bytes to base64 to get a string
			return String.valueOf(Base64.getEncoder().encode(enc));
		} catch (Exception e) {
			logger.error("encrypting error", e);
		}
		return null;
	}

	/**
	 * Decrypts the input.
	 * 
	 * @param str
	 * @return decrypted input
	 */
	public String decrypt(String str) {
		try {
			// Decode base64 to get bytes
			byte[] dec = Base64.getDecoder().decode(str);

			// Decrypt
			byte[] utf8 = dcipher.doFinal(dec);

			// Decode using utf-8
			return new String(utf8, "UTF8");
		} catch (Exception e) {
			logger.error("encrypting error", e);
		}

		return null;
	}
}